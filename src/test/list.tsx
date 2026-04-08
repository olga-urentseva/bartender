import React from "react";

interface Item {
  id: number;
  text: string;
}

interface Props {
  items: Item[];
  itemHeight: number;
}

// the main issue that frontend sends 1 request to get 10000 items. this is bad solution because it will freeze frontend.
// the "virtual list" pagination on a frontend side is actually hides from user that amount of items,
// but not hides from the react app itself. so react app will still have to render 10000 items and it will cause performance issues.
// the better solution is to implement pagination on a backend side,
// so frontend will send request with page number and page size, and backend will return only that amount of items that is needed for current page. this way we will avoid performance issues and also we will reduce amount of data that is sent over the network.
// so in this situation we have to collabborate with backend dev.
// i cannot do it on a frontend side only. it would be bad for the business.

const VirtualList: React.FC<Props> = ({ items, itemHeight }) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const containerHeight = 500;
  const overscan = 3;

  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = startIndex + visibleCount + overscan;

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: containerHeight, overflowY: "scroll" }}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item) => (
            <div style={{ height: itemHeight }}>{item.text}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
