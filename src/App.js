import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'draft-js-mention-plugin/lib/plugin.css';

import { EditorState , ContentState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved

import { fromJS } from 'immutable';

// import mentionStyles from './mention.css';

const mentions = fromJS([
  {
    name: 'Ground Contol',  
  },
  {
    name: 'Major Tom',
  },
  {
    name: 'Hola',
  },
  {
    name: 'Amigo',
  },
  {
    name: 'Test me ',
  },
  {
    name: 'Yup',
  },
]);

const mentionPlugin = createMentionPlugin({
  mentionTrigger: '{',
  mentionPrefix : '{{',
  mentionSuffix : '}}'
});
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

class App extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = (a) => {
    // get the mention object selected
    // setTimeout(()=>{

    //   var reducedString = this.state.editorState.getCurrentContent().getPlainText().replace(/\s/g,'')
    //   this.setState({
    //     editorState : EditorState.createWithContent(ContentState.createFromText(reducedString))
    //   })
    // },10) 
    console.log('state',this.state)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={this.onAddMention}
          />
        </div>
      </div>
    );
  }
}

export default App;
