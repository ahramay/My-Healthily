import React from 'react';
import CollectionBox from './CollectionBox';

type Props = {
    items?: any;
    accept: any;
    title?: string;
    titlePlaceholder?: string;
    saveTitle?: any;
    onItemDropped?: any;
}

const DropBoxHolder:React.FC<Props> = ({
    items,
    accept,
    title,
    titlePlaceholder,
    saveTitle,
    onItemDropped,
}) => {
    return (
        <CollectionBox 
            edit={true} 
            title={title} 
            items={items} 
            accept={accept} 
            area="list" 
            onItemDropped={onItemDropped} 
            saveTitle={saveTitle}
            titlePlaceholder={titlePlaceholder}
        />
    )
};

export default React.memo(DropBoxHolder);