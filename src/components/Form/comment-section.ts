import { LitElement, html, nothing, css} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../radio-input.js";

@customElement("comment-section")
export class CommentSection extends LitElement {
    static styles = css`
        #comment-section {
            margin-bottom: 1em;
        }
    
        textarea {
            resize: none;
            display: block;
            margin: 1em auto 0;
            border: 1px solid rgba(var(--black), 0.5);
            border-radius: 0.25em;
            width: 98%;
            height: 10em;
            overflow-y: scroll;
            font-family: var(--font);
            padding: 0.5em;
        }

        textarea::placeholder {
            color: rgba(var(--black), 0.5);
        }


        
    `

    @property()
    comment!: string;

    @state()
    commentStatus!: 'Yes' | 'No';

    constructor(){
        super();
        this.comment = '';
    }

    protected render() {
        return html`
            <div id="comment-section">
                <form-header
                    title="Additional Comments">
                </form-header>
                <radio-input prompt="Is there any other info we need to properly record the report for this unit?" .labels=${['Yes', 'No']} @retrieve-selection=${this._setCommentStatus}></radio-input>
                ${this.commentStatus === 'Yes' ? html`<textarea id="comment-textarea" placeholder="Enter comments here..." @change=${this._updateComment.bind(this)} value=${this.comment}></textarea>` : nothing}
            </div>
        `;
    }

    _updateComment(e:{target: HTMLTextAreaElement}) {
        this.comment = e?.target.value;

        this.dispatchEvent(new CustomEvent('get-comment', {
            detail: this.comment,
            bubbles: true,
            composed: true
        }));
    }

    _setCommentStatus(e: CustomEvent) {
        this.commentStatus = e.detail as 'Yes' | 'No';
    }
}

declare global {
    interface HTMLElementTagName {
        'comment-section': CommentSection;
    }
}
