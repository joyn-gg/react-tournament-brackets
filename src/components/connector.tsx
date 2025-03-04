import useMatchHighlightContext from 'Hooks/use-match-highlight';
import React from 'react';
import { getCalculatedStyles } from '../settings';

const Connector = ({
  bracketSnippet,
  previousBottomMatchPosition = null,
  previousTopMatchPosition = null,
  currentMatchPosition,
  style,
}) => {
  const {
    boxHeight,
    connectorColor,
    roundHeader,
    roundSeparatorWidth,
    lineInfo,
    horizontalOffset,
    connectorColorHighlight,
    width,
  } = getCalculatedStyles(style);
  const bottomMatchAvailable =
    bracketSnippet &&
    bracketSnippet.previousBottomMatch &&
    bracketSnippet.previousBottomMatch.state !== 'NO_PARTY';
  const topMatchAvailable =
    bracketSnippet &&
    bracketSnippet.previousTopMatch &&
    bracketSnippet.previousTopMatch.state !== 'NO_PARTY';

  const pathInfo = multiplier => {
    const middlePointOfMatchComponent = boxHeight / 2;
    const previousMatch =
      multiplier > 0 ? previousBottomMatchPosition : previousTopMatchPosition;
    const startPoint = `${
      currentMatchPosition.x - horizontalOffset - lineInfo.separation
    } ${
      currentMatchPosition.y +
      lineInfo.homeVisitorSpread * multiplier +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0)
    }`;
    const horizontalWidthLeft =
      currentMatchPosition.x - roundSeparatorWidth / 2 - horizontalOffset;
    const isPreviousMatchOnSameYLevel =
      Math.abs(currentMatchPosition.y - previousMatch.y) < 1;

    const verticalHeight =
      previousMatch.y +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);
    const horizontalWidthRight = previousMatch.x + width;

    if (isPreviousMatchOnSameYLevel) {
      return [`M${startPoint}`, `H${horizontalWidthRight}`];
    }

    return [
      `M${startPoint}`,
      `H${horizontalWidthLeft}`,
      `V${verticalHeight}`,
      `H${horizontalWidthRight}`,
    ];
  };

  const { topHighlighted, bottomHighlighted } = useMatchHighlightContext({
    bracketSnippet,
  });

  const { x, y } = currentMatchPosition;
  return (
    <>
      {previousTopMatchPosition && topMatchAvailable && (
        <path
          d={pathInfo(-1).join(' ')}
          id={`connector-${x}-${y}-${-1}`}
          fill="transparent"
          stroke={topHighlighted ? connectorColorHighlight : connectorColor}
        />
      )}
      {previousBottomMatchPosition && bottomMatchAvailable && (
        <path
          d={pathInfo(1).join(' ')}
          id={`connector-${x}-${y}-${1}`}
          fill="transparent"
          stroke={bottomHighlighted ? connectorColorHighlight : connectorColor}
        />
      )}

      {topHighlighted && topMatchAvailable && (
        <use href={`connector-${x}-${y}-${-1}`} />
      )}
      {bottomHighlighted && bottomMatchAvailable && (
        <use href={`connector-${x}-${y}-${1}`} />
      )}
    </>
  );
};
export default Connector;
