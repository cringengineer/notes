import React, {useState} from 'react';
import Note from "../note/Note";
import NewNote from "../newNote/NewNote";
import style from './noteContainer.module.scss'
import {dataType} from "../../types";

const NoteContainer = () => {
    let data:dataType[]= [
        {
            id: 0,
            title: "Guide",
            text: "You can: add note, delete note, edit note, add hashtag (for example: #js) and filter notes by hashtag!"
        }
    ];
    let newId = data.length;
    const [hashTags,setHashTags] = useState([''])
    const [DB,setDB] = useState<dataType[]>(data);
    return (
        <div>
            <NewNote  hashTags={hashTags} newId={newId} db={DB} setDB={setDB} />
            <div className={style.container}>
                {DB.map((item: { id: number; text: string; title: string; }) => {
                    return <Note hashTags={hashTags} setHashTags={setHashTags} db={DB} setDB={setDB}  key={item.id} id={item.id} text={item.text} title={item.title}/>
                })}
            </div>
        </div>
    );
};

export default NoteContainer;