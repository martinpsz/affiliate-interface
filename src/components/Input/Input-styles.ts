import {css} from 'lit'

export const inputFieldStyles = css`
    input[type='text'], 
    input[type='number'], 
    input[type='email'],
    input[type='tel'], 
    input[type='date']
    .adjustment{
        border: none;
        border-bottom: 1px solid rgba(var(--black), 0.5);
        padding-top: 0.25em;
        font-family: var(--font);
    }

    input[type='text']:focus, 
    input[type='number']:focus, 
    input[type='email']:focus,
    input[type='tel']:focus, 
    input[type='date']:focus{
        outline: transparent;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }


    input[type=number] {
        -moz-appearance: textfield;
    }   

   .file-input{
        display: inline-flex;
        flex-direction: column;
        background: rgb(var(--blue));
        padding: 0.375em 0.75em;
        color: rgb(var(--white));
        border-radius: 0.25em;
        justify-content: center;
        align-items: center;
        font-weight: 400;
    }

    .file-input input[type='file']{
        display: none;
    }


    label{
        font-family: var(--font);
        font-weight: 200;
        text-transform: uppercase;
        font-size: 0.8em;
    }

`