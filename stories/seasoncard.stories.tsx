import "babel-polyfill";
import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { LinkTo } from "@storybook/addon-links";

import { Provider } from "react-redux";
import createHistory from "history/createMemoryHistory";
import makeStore from "lib/store";

import StorybookMount from "components/StorybookMount";
import SeasonCard from "components/Pages/Player/ranks/Seasoncard";

const history = createHistory();

const { store } = makeStore(history);

const demoprops = {
    season: 3,
    apac: {
        wins: 50,
        losses: 6,
        abandons: 2,
        mmr: 4500.23,
        maxMmr: 4550.33,
        rank: 20,
        maxRank: 20,
        skill: 45,
        uncertainty: 2.23,
    },
    emea: {
        wins: 50,
        losses: 6,
        abandons: 2,
        mmr: 4500.23,
        maxMmr: 4550.33,
        rank: 20,
        maxRank: 20,
        skill: 45,
        uncertainty: 2.23,
    },
    ncsa: {
        wins: 50,
        losses: 6,
        abandons: 2,
        mmr: 4500.23,
        maxMmr: 4550.33,
        rank: 20,
        maxRank: 20,
        skill: 45,
        uncertainty: 2.23,
    },
};

storiesOf("SeasonCard", module)
    .addDecorator(getStory => <StorybookMount>{getStory()}</StorybookMount>)
    .add("empty Page", () => <SeasonCard {...demoprops} />);
