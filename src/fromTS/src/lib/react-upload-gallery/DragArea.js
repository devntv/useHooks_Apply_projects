/* eslint-disable react/no-array-index-key */
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Context from './Context';
import { arrayMove } from './Utils';

const DragItem = SortableElement(({ children }) => <div>{children}</div>);
const SortableList = SortableContainer(({ children }) => children);

const DragArea = (props) => {
  const { children, className, style } = props;

  return (
    <Context.Consumer>
      {({ images, setSort }) => (
        <SortableList
          {...props}
          helperClass="rug-dragging-item"
          onSortEnd={({ oldIndex, newIndex }) => {
            setSort(arrayMove(images, oldIndex, newIndex), {
              oldIndex,
              newIndex,
            });
          }}
        >
          <div className={className} style={style}>
            {images.map((image, key) => (
              <DragItem key={`drag-item-${key}`} index={key}>
                {children(image)}
              </DragItem>
            ))}
          </div>
        </SortableList>
      )}
    </Context.Consumer>
  );
};

DragArea.defaultProps = {
  lockAxis: null,
  useWindowAsScrollContainer: true,
  pressDelay: 200,
  axis: 'xy',
  style: {},
};

export default DragArea;
