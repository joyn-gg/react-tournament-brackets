import React from 'react';
import { ThemeProvider } from 'styled-components';
import { sortAlphanumerically } from 'Utils/string';
import { calculateSVGDimensions } from 'Core/calculate-svg-dimensions';
import { MatchContextProvider } from 'Core/match-context';
import MatchWrapper from 'Core/match-wrapper';
import RoundHeader from 'Components/round-header';
import { getPreviousMatches } from 'Core/match-functions';
import { SingleElimLeaderboardProps } from '../types';
import { defaultStyle, getCalculatedStyles } from '../settings';
import { calculatePositionOfMatch } from './calculate-match-position';

import Connectors from './connectors';
import defaultTheme from '../themes/themes';

const SingleEliminationBracket = ({
  matches,
  matchComponent,
  currentRound,
  onMatchClick,
  onPartyClick,
  svgWrapper: SvgWrapper = ({ children }) => <div>{children}</div>,
  theme = defaultTheme,
  options: { style: inputStyle } = {
    style: defaultStyle,
  },
}: SingleElimLeaderboardProps) => {
  const style = {
    ...defaultStyle,
    ...inputStyle,
    roundHeader: {
      ...defaultStyle.roundHeader,
      ...inputStyle.roundHeader,
    },
    lineInfo: {
      ...defaultStyle.lineInfo,
      ...inputStyle.lineInfo,
    },
  };

  const { roundHeader, columnWidth, canvasPadding, rowHeight, width } =
    getCalculatedStyles(style);

  const lastGame = matches.find(match => !match.nextMatchId && !match.decider);
  const decider = matches.find(match => match.decider);

  const generateColumn = matchesColumn => {
    const previousMatchesColumn = matchesColumn.reduce((result, match) => {
      return [
        ...result,
        ...matches
          .filter(m => m.nextMatchId === match.id)
          .sort((a, b) => sortAlphanumerically(a.name, b.name)),
      ];
    }, []);

    if (previousMatchesColumn.length > 0) {
      return [...generateColumn(previousMatchesColumn), previousMatchesColumn];
    }
    return [previousMatchesColumn];
  };
  const generate2DBracketArray = final => {
    return final
      ? [...generateColumn([final]), [final]].filter(arr => arr.length > 0)
      : [];
  };
  const columns = generate2DBracketArray(lastGame);
  // [
  //   [ First column ]
  //   [ 2nd column ]
  //   [ 3rd column ]
  //   [ lastGame ]
  // ]

  const { gameWidth, gameHeight, startPosition } = calculateSVGDimensions(
    columns[0].length,
    columns.length,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );

  const finalMatchPos = calculatePositionOfMatch(0, columns.length - 1, {
    canvasPadding,
    columnWidth,
    rowHeight,
  });

  const deciderY =
    finalMatchPos.y +
    style.boxHeight +
    style.spaceBetweenRows +
    (roundHeader.isShown
      ? (roundHeader.height + roundHeader.marginBottom) * 2
      : 0);
  const deciderBottom = deciderY + style.boxHeight + canvasPadding;
  const realGameHeight =
    decider && deciderBottom > gameHeight ? deciderBottom : gameHeight;

  return (
    <ThemeProvider theme={theme}>
      <SvgWrapper
        bracketWidth={gameWidth}
        bracketHeight={realGameHeight}
        startAt={startPosition}
      >
        <svg
          height={realGameHeight}
          width={gameWidth}
          viewBox={`0 0 ${gameWidth} ${realGameHeight}`}
        >
          <MatchContextProvider>
            <g>
              {columns.map((matchesColumn, columnIndex) =>
                matchesColumn.map((match, rowIndex) => {
                  const { x, y } = calculatePositionOfMatch(
                    rowIndex,
                    columnIndex,
                    {
                      canvasPadding,
                      columnWidth,
                      rowHeight,
                    }
                  );
                  const previousBottomPosition = (rowIndex + 1) * 2 - 1;

                  const { previousTopMatch, previousBottomMatch } =
                    getPreviousMatches(
                      columnIndex,
                      columns,
                      previousBottomPosition
                    );
                  return (
                    <>
                      {roundHeader.isShown && (
                        <RoundHeader
                          x={x}
                          roundHeader={roundHeader}
                          canvasPadding={canvasPadding}
                          width={width}
                          numOfRounds={columns.length}
                          tournamentRoundText={match.tournamentRoundText}
                          columnIndex={columnIndex}
                        />
                      )}
                      {columnIndex !== 0 && (
                        <Connectors
                          {...{
                            bracketSnippet: {
                              currentMatch: match,
                              previousTopMatch,
                              previousBottomMatch,
                            },
                            rowIndex,
                            columnIndex,
                            gameHeight,
                            gameWidth,
                            style,
                          }}
                        />
                      )}
                      <g>
                        <MatchWrapper
                          x={x}
                          y={
                            y +
                            (roundHeader.isShown
                              ? roundHeader.height + roundHeader.marginBottom
                              : 0)
                          }
                          rowIndex={rowIndex}
                          columnIndex={columnIndex}
                          match={match}
                          previousBottomMatch={previousBottomMatch}
                          topText={match.startTime}
                          bottomText={match.name}
                          teams={match.participants}
                          onMatchClick={onMatchClick}
                          onPartyClick={onPartyClick}
                          style={style}
                          matchComponent={matchComponent}
                        />
                      </g>
                    </>
                  );
                })
              )}
            </g>
            {decider && (
              <g>
                {roundHeader.isShown && (
                  <RoundHeader
                    x={finalMatchPos.x}
                    y={
                      deciderY -
                      (roundHeader.height / 2 + roundHeader.marginBottom) * 2
                    }
                    roundHeader={roundHeader}
                    canvasPadding={canvasPadding}
                    width={width}
                    numOfRounds={0}
                    textOverride="Decider Match"
                    columnIndex={columns.length - 1}
                  />
                )}
                <MatchWrapper
                  x={finalMatchPos.x}
                  y={deciderY}
                  rowIndex={1}
                  columnIndex={columns.length - 1}
                  match={decider}
                  topText={decider.startTime}
                  bottomText={decider.name}
                  teams={decider.participants}
                  onMatchClick={onMatchClick}
                  onPartyClick={onPartyClick}
                  style={style}
                  matchComponent={matchComponent}
                />
              </g>
            )}
          </MatchContextProvider>
        </svg>
      </SvgWrapper>
    </ThemeProvider>
  );
};

export default SingleEliminationBracket;
