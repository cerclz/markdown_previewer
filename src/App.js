import './App.css';
import { useState } from 'react';
import {marked} from 'marked';
import DOMPurify from 'dompurify';

marked.use({
  breaks:true
})

let defaultText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and


> Block Quotes!


And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;


function App() {
  let [value, setValue] = useState(defaultText);
  let markedText = marked.parse(value)

  let sanitizedValue = DOMPurify.sanitize(markedText);

  const handleValueChange = e => {
    setValue(e.target.value)
  }


  return (
    <div className="container-fluid">
      <div className="row" style={{height: 100 + "vh"}}>
        <div className="col bg-black">
          <textarea id="editor" name="editor" onChange={handleValueChange}>{defaultText}</textarea>
        </div>
        <div id="preview" className="col bg-dark h-100 text-white" dangerouslySetInnerHTML={{ __html: sanitizedValue }}>
        </div>
      </div>

    </div>
  );
}

export default App;
