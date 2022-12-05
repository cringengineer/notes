import React, {FC, useState} from 'react';
import style from './NewNote.module.scss';
import {NewNoteProps} from "../../types";


const NewNote:FC<NewNoteProps> = ({db,setDB,newId,hashTags}) => {
    const [step,setStep] = useState(1);
    const [id,setId] = useState(newId);
    const [note,setNote] = useState({
        id: id,
        title:'',
        text:'',
    });

    const onTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNote({id:id,title: e.currentTarget.value, text: note.text})
    };

    const onTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNote({id:id,title: note.title, text: e.currentTarget.value})
    };

    const addNote = () => {
        setDB([...db,note]);
        setId(id + 1);
        setNote({id:id,text: '',title: ''})
        setStep(1)
    };

    const validate = () => {
        if(!note.title) {
            alert('Please write a title!')
        } else {
            setStep(2)
        }
    };

    const filterByTag = (tag:string) => {
        setDB(db.filter(item => {
            if(item.text.includes(tag)) {
                return item;
            }
        }))
    }

    return (
        <div className={style.new__note__container}>
            {step === 1 ? <input maxLength={20} value={note.title} onChange={(e)=> onTitleChange(e)} placeholder={'Title'}/> : <input maxLength={350} value={note.text} onChange={(e)=> onTextChange(e)} placeholder={'Text'}/>}
            {step === 1 ? <button onClick={()=> validate()}>Next</button> : <button onClick={()=> addNote()}>Add note</button>}
            <div className={style.hashtags__container}>
                {hashTags.map(item=> {
                    return <p key={hashTags.length+Math.random()} onClick={()=> filterByTag(item)}>{item}</p>
                })}
            </div>
        </div>
    );
};

export default NewNote;