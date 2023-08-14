import { pointerWithin, rectIntersection } from '@dnd-kit/core';
import { add, isEqual, startOfDay } from 'date-fns';
import { getCoordinatesOfEvent } from '../components/calendar/events/utils';
import { HOUR_HEIGHT } from '../constants/styles';

// infer type from pointerWithin params
export type CollisionsArgs = Parameters<typeof pointerWithin>[0];

export const pointerCollisions = (args: CollisionsArgs) => {
	// First, let's see if there are any collisions with the pointer
	const pointerCollisions = pointerWithin(args);
	if (pointerCollisions.length > 0) {
		return pointerCollisions;
	}

	// If there are no collisions with the pointer, return rectangle intersections
	return rectIntersection(args);
};

// This function detects if a draggable element is colliding with droppables
// It is used in the 5 minute interval calendar
// Uses dnd-kit's collision detection algorithms
// TODO: Calculate the actual new time based on the top of the collisionRect, use that as the new upper bound instead of collision rect
export const custom5MinuteCollisions = (args: CollisionsArgs) => {
	const pointerCollisions = pointerWithin(args);

	const { collisionRect, droppableRects, active, droppableContainers } = args;
	const { top } = collisionRect;

	const { startTime, endTime } = active.data.current ?? {
		startTime: new Date(),
		endTime: add(new Date(), { minutes: 30 }),
	};

	const { startY: startTimeTop, endY: startTimeBottom } = getCoordinatesOfEvent(
		startTime,
		endTime,
		HOUR_HEIGHT * 24,
	);

	const height = startTimeBottom - startTimeTop;
	const bottom = top + height;

	const droppablesArr = Array.from(droppableRects)
		.map((d) => ({
			id: d[0],
			top: d[1].top,
			bottom: d[1].top + d[1].height,
			left: d[1].left,
			right: d[1].right,
		}))
		.sort((a, b) => a.top - b.top);

	const centerCollision = pointerCollisions[0];

	if (centerCollision) {
		const droppableContainer = droppableRects.get(centerCollision.id);
		const delta = (bottom - top) / 2;

		const firstIndex = findTopToBottom(
			droppablesArr,
			droppableContainer,
			(a, b) => a.top > b.top - delta,
		);

		const indexOfPointer = droppablesArr.findIndex(
			(d) => d.id === centerCollision.id,
		);

		if (firstIndex === -1) {
			return pointerCollisions; // No collisions found
		}

		// We want elements from firstIndex through indexOfPointer to index of element that is same distance
		// between firstIndex and indexOfPointer but in the positive direction
		const lastIndex = indexOfPointer + (indexOfPointer - firstIndex);
		const collisions = droppablesArr.slice(firstIndex, lastIndex + 1);

		if (
			centerCollision.data.droppableContainer.data.current.type ===
			'droppableAllDaySlot'
		) {
			return [centerCollision];
		}

		return collisions
			.map((c) => {
				const droppableContainer = droppableRects.get(c.id);
				const droppableContainerData = droppableContainers.find(
					(container) => container.id === c.id,
				);

				return {
					id: c.id,
					data: {
						droppableContainer: {
							...droppableContainer,
							time: droppableContainerData.data.current.time,
							// we need to return the actual position top of the collisionRect
							top: droppableContainer.top,
							collisionRect,
						},
					},
				};
			})
			.filter((collision) =>
				isEqual(
					startOfDay(centerCollision.data.droppableContainer.data.current.time),
					startOfDay(collision.data.droppableContainer.time),
				),
			);
	}

	return rectIntersection(args);
};

function findTopToBottom(arr, target, comparator) {
	let start = 0;
	let end = arr.length - 1;
	let index = -1;

	while (start <= end) {
		const mid = Math.floor((start + end) / 2);
		const midObj = arr[mid];

		if (comparator(midObj, target)) {
			index = mid;
			end = mid - 1;
		} else {
			start = mid + 1;
		}
	}

	return index;
}

function findLeftToRight(
	items: any[],
	targetLeft: number,
	targetRight: number,
): any[] {
	const results: any[] = [];

	let left = 0;
	let right = items.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		if (items[mid].right <= targetRight && items[mid].left >= targetLeft) {
			results.push(items[mid]);
		}

		if (items[mid].right < targetRight) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return results;
}
