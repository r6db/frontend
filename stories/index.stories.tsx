import "babel-polyfill";
import * as React from "react";

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LinkTo } from '@storybook/addon-links';

import { Provider } from "react-redux";
import createHistory from "history/createMemoryHistory";
import makeStore from "lib/store";

import StorybookMount from "components/StorybookMount";
import Loading from "../src/app/components/misc/Loading";
import * as Page from "components/misc/Page";
import Modal from "components/misc/Modal";
import Stat from "components/misc/Stat";
import Scale, { SCALES } from "components/misc/Scale";

const history = createHistory();

const { store } = makeStore(history);

import imageLanding from "assets/landing.jpg";


storiesOf("Loading", module)
  .add("basic", () => (
    <div style={{ width: "100vw", height: "100vh"}}>
      <Loading />
    </div>
  ));

storiesOf("Page", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <StorybookMount>
        {getStory()}
      </StorybookMount>
    </Provider>
  ))
  .add("empty Page", () => (
    <Page.Page>
      <Page.PageHead />
      <Page.PageContent />
    </Page.Page>
  ))
  .add("with Headcontent", () => (
    <Page.Page>
      <Page.PageHead>
        <div className="container">
          <header className="header">I'm a header</header>
        </div>
      </Page.PageHead>
      <Page.PageContent />
    </Page.Page>
  ))
  .add("with Image", () => (
    <Page.Page>
      <Page.PageHead image={imageLanding} />
      <Page.PageContent />
    </Page.Page>
  ))
  .add("with Position", () => (
    <Page.Page>
      <Page.PageHead image={imageLanding} position="0% 100%" />
      <Page.PageContent />
    </Page.Page>
  ))
  .add("full", () => (
    <Page.Page>
      <Page.PageHead image={imageLanding}>
        <div className="container">
          <header className="header">I'm a header</header>
        </div>
      </Page.PageHead>
      <Page.PageContent>
        <div className="container">
          <p>more content, woo!</p>
          <p>more content, woo!</p>
          <p>more content, woo!</p>
          <p>more content, woo!</p>
          <p>more content, woo!</p>
          <p>more content, woo!</p>
        </div>
      </Page.PageContent>
    </Page.Page>
  ));
  
storiesOf("Modal", module)
  .add("basic", () => (
    <Modal title="modal title" onclose={action("onclose()")}>
      some content
    </Modal>
  ));

storiesOf("Stat", module)
  .add("basic", () => <Stat label="label">100</Stat>)
  .add("with Scale", () => (
    <Stat label="label">
      <Scale scale={SCALES.KD} value={1.8} />
    </Stat>
  ))