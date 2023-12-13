import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import NavigationSidebar from '../components/navigation/sidebar/Sidebar';

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree />}>
			<ComponentPreview path="/NavigationSidebar">
				<NavigationSidebar />
			</ComponentPreview>
			<ComponentPreview path="/ComponentPreviews">
				<ComponentPreviews />
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;
