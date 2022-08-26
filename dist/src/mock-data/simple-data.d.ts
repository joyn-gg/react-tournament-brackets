export declare const walkOverData: {
    id: number;
    name: string;
    nextMatchId: number;
    nextLooserMatchId: any;
    tournamentRoundText: string;
    startTime: string;
    state: string;
    participants: ({
        id: string;
        resultText: string;
        isWinner: boolean;
        status: string;
        name: string;
    } | {
        id: string;
        resultText: string;
        isWinner: boolean;
        status: string;
        name?: undefined;
    })[];
}[];
export declare const simpleSmallBracket: {
    id: number;
    nextMatchId: number;
    tournamentRoundText: string;
    startTime: string;
    state: string;
    participants: {
        id: string;
        resultText: string;
        isWinner: boolean;
        status: string;
        name: string;
        picture: string;
    }[];
}[];
export declare const simpleSmallBracketWithDecider: ({
    id: number;
    nextMatchId: number;
    tournamentRoundText: string;
    startTime: string;
    state: string;
    participants: {
        id: string;
        resultText: string;
        isWinner: boolean;
        status: string;
        name: string;
        picture: string;
    }[];
} | {
    id: number;
    nextMatchId: any;
    tournamentRoundText: string;
    startTime: string;
    state: string;
    participants: any[];
    decider: boolean;
})[];
export declare const simpleBracket: {
    id: number;
    name: string;
    nextMatchId: number;
    nextLooserMatchId: any;
    tournamentRoundText: string;
    startTime: string;
    state: string;
    participants: {
        id: string;
        resultText: string;
        isWinner: boolean;
        status: string;
        name: string;
        picture: string;
    }[];
}[];
