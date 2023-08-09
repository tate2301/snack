import { pointerWithin, rectIntersection, Collision } from '@dnd-kit/core';
import { add } from 'date-fns';
import { getCoordinatesOfEvent } from '../components/calendar/events/utils';

// infer type from pointerWithin params
export type CollisionsArgs = Parameters<typeof pointerWithin>[0];

export const customDayTimeCollisions = (args: CollisionsArgs) => {
	console.log(args);

	// First, let's see if there are any collisions with the pointer
	const pointerCollisions = pointerWithin(args);

	console.log({ pointerCollisions });

	// Collision detection algorithms return an array of collisions
	if (pointerCollisions.length > 0) {
		return pointerCollisions;
	}

	// If there are no collisions with the pointer, return rectangle intersections
	return rectIntersection(args);
};

// This function detects if a draggable element is colliding with droppables
// It is used in the 5 minute interval calendar
// Uses dnd-kit's collision detection algorithms
export const custom5MinuteCollisions = (args: CollisionsArgs) => {
	const pointerCollisions = pointerWithin(args);

	const { collisionRect, droppableRects, active } = args;
	const { top } = collisionRect;

	const { startTime, endTime } = active.data.current ?? {
		startTime: new Date(),
		endTime: add(new Date(), { minutes: 30 }),
	};

	const { startY: startTimeTop, endY: startTimeBottom } = getCoordinatesOfEvent(
		startTime,
		endTime,
		80 * 24,
	);

	const height = startTimeBottom - startTimeTop;
	const bottom = top + height;

	const droppablesArr = Array.from(droppableRects)
		.map((d) => ({
			id: d[0],
			top: d[1].top,
			bottom: d[1].top + d[1].height,
		}))
		.sort((a, b) => a.top - b.top);

	const centerCollision = pointerCollisions[0];

	if (centerCollision) {
		const droppableContainer = droppableRects.get(centerCollision.id);
		const delta = (bottom - top) / 2;

		const firstIndex = binarySearch(
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

		return collisions.map((c) => {
			const droppableContainer = droppableRects.get(c.id);

			return {
				id: c.id,
				data: {
					droppableContainer,
				},
			};
		});
	}

	let collisions = [];
	// Find the index of the first droppable that is below the draggable element
	const firstBelow = droppablesArr.findIndex((d) => d.top > top);
	// Find the index of the first droppable that is above the draggable element
	const firstAbove = droppablesArr.findIndex((d) => d.bottom > bottom);

	// If the draggable element is below all droppables, return the last droppable
	if (firstBelow === -1) {
		collisions = [droppablesArr[droppablesArr.length - 1]];
	} else if (firstAbove === -1) {
		// If the draggable element is above all droppables, return the first droppable
		collisions = [droppablesArr[0]];
	} else {
		// If the draggable element is between two droppables, return both droppables
		collisions = droppablesArr.slice(firstBelow, firstAbove + 1);
	}

	const c: Collision = {
		id: 'test',
		data: {
			current: null,
		},
	};

	// Find collisions by id from the droppableRects map
	const collisionsWithRects: Collision[] = collisions.map((c) => {
		const droppableContainer = droppableRects.get(c.id);

		return {
			id: c.id,
			data: {
				droppableContainer,
			},
		};
	});

	return [...pointerCollisions, ...collisionsWithRects];
};

function binarySearch(arr, target, comparator) {
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
