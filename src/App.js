import "./App.css";
import { create, readAll, read, update } from "./data/documents";

import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const { colors } = require("@material-ui/core");
const { AppBar } = require("@material-ui/core");
const { Toolbar } = require("@material-ui/core");
const { Typography } = require("@material-ui/core");
const { Button } = require("@material-ui/core");
const { InputLabel } = require("@material-ui/core");
const { Select } = require("@material-ui/core");
const { MenuItem } = require("@material-ui/core");
const { TextField } = require("@material-ui/core");

function App() {
    const [editor, setEditor] = useState(null);
    const valueRef = useRef('');
    const data = "";
    let allfiles;

    readAll();
    allfiles = JSON.parse(localStorage.getItem("all"));
    function getContents(id, text) {
        readAll();
        allfiles = JSON.parse(localStorage.getItem("all"));
        read(id);
        editor.setData(text);
    }
    function createFile(name) {
        if (name === "")
            alert("File name is missing!");
        else {
            let fileexists = 0;
            for (let i=0; i<allfiles.length; i++) {
                if (name === allfiles[i].title) {
                    fileexists = 1;
                    alert("File already exists!");
                    break;
                }
            }
            if (fileexists == 0) {
                create(name);
                localStorage.setItem("title", name);
                editor.setData("");
                readAll();
                allfiles = JSON.parse(localStorage.getItem("all"));
            }
        }
    }
    return (
        <div className="App">
        <AppBar position='sticky'>
        <Toolbar>
        <InputLabel>File:  |</InputLabel>
        <Select>
        {allfiles.map(f => (
            <MenuItem
            value={f.title} onClick={() => getContents(f._id, f.text)} >{f.title}
            </MenuItem>
        ))}
        </Select>
        <Typography variant="h5" style={{flexGrow: 1}}>
        Signe's editor
        </Typography>
        <TextField
        id="outlined-textarea"
        label='New file name'
        placeholder='Write new file name'
        variant='outlined'
        style={{color: colors.grey[100]}}
        inputRef={valueRef}
        />
        <Button
        style={{color: colors.grey[100]}}
        onClick={() => createFile(valueRef.current.value)}>
        New
        </Button>
        <Button
        style={{color: colors.grey[100]}}
        onClick={() => update(localStorage.getItem("id"), localStorage.getItem("title"), editor.getData())}>
        Save
        </Button>
        </Toolbar>
        </AppBar>
        <CKEditor
        id="input text"
        editor={ ClassicEditor }
        data="<p>Hello from CKEditor 5!</p>"
        onReady={ editor => {
            setEditor(editor);
            console.log( 'Editor is ready to use!', editor );
            localStorage.clear();
            readAll();
            allfiles = JSON.parse(localStorage.getItem("all"));
        } }
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            console.log( { event, editor, data } );
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }
        />
        </div>
    );
}

export default App;
