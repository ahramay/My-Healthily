
	import React from 'react'
	import DragDrop from './DragDrop'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'

	type Props = {
		dropItems?: any;
		collectionItems?: any;
		titlePlaceholder?: string;
	}

	const DraggableLayout:React.FC<Props> = ({
		dropItems, collectionItems, titlePlaceholder
	}) => {
		return(
			<>
				<DndProvider backend={HTML5Backend}>
					<DragDrop dropItems={dropItems} collectionItems={collectionItems} titlePlaceholder={titlePlaceholder} />
				</DndProvider>
			</>
		)
	};

	export default React.memo(DraggableLayout);