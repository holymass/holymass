import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import List from 'react-virtualized/dist/commonjs/List';
import CellMeasurer from 'react-virtualized/dist/commonjs/CellMeasurer/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/commonjs/CellMeasurer/CellMeasurerCache';

const cache = new CellMeasurerCache({
  defaultHeight: 100,
  minHeight: 85,
  fixedWidth: true,
  keyMapper: () => 1,
});

const useStyles = makeStyles(() => ({
  root: {
    outline: 'none',
  },
}));

export default function VirtualizedList(props) {
  const { data, renderer, hasNext, loadMoreRows } = props;
  const classes = useStyles();
  const rowCount = hasNext ? data.length + 1 : data.length;
  const isRowLoaded = ({ index }) => {
    return !hasNext || index < data.length;
  };
  const rowRenderer = ({
    index,
    isScrolling,
    isVisible,
    key,
    parent,
    style,
  }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
      >
        {() => (
          <div style={style}>
            {isRowLoaded({ index })
              ? renderer(data[index], {
                  index,
                  isScrolling,
                  isVisible,
                  key,
                  parent,
                  style,
                })
              : 'Loading...'}
          </div>
        )}
      </CellMeasurer>
    );
  };
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className={classes.root}
              height={height}
              width={width}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowCount={rowCount}
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}

VirtualizedList.propTypes = {
  renderer: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  hasNext: PropTypes.bool.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
};
