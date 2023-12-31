import React, { useState } from "react";
import ReactMde from "react-mde";
// react-mde does not support React 18 yet -  
// to use properties and styling I need to import following:
import 'react-mde/lib/styles/css/react-mde-all.css';
import Showdown from "showdown";

export default function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    })

    return (
        <section className="pane editor">
            <ReactMde 
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}