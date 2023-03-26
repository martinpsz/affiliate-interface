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
    comment!: string | undefined;

    @state()
    commentStatus!: 'Yes' | 'No';

    protected render() {
        return html`
            <div id="comment-section">
                <form-header
                    title="Additional Comments">
                </form-header>
                <radio-input prompt="Is there any other info we need to properly record the report for this unit?" .labels=${['Yes', 'No']} @retrieve-selection=${this._setCommentStatus}></radio-input>
                ${this.commentStatus === 'Yes' ? html`<textarea id="comment-textarea" placeholder="Enter comments here..." @input=${this._updateComment} .value=${''}></textarea>` : nothing}
            </div>
        `;
    }

    _updateComment(e: Event) {
        this.comment = (e.target as HTMLTextAreaElement).value;
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
