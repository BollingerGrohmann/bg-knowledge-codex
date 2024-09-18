import EditorJS from '@editorjs/editorjs';

/**
 * Block Tools for the Editor
 */
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import CodeTool from '@editorjs/code';
import NestedList from '@editorjs/nested-list';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import Embed from '@editorjs/embed';
import AttachesTool from '@editorjs/attaches';
import Paragraph from '@editorjs/paragraph';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import ColorPlugin from "editorjs-text-color-plugin";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";



import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import ChangeCase from 'editorjs-change-case';







const config = {
  shortcuts: {
    undo: "CMD+Z",
    redo: "CMD+SHIFT+Z"
  }
};



/**
 * Class for working with Editor.js
 */
export default class Editor {
  /**
   * Creates Editor instance
   *
   * @param {object} editorConfig - configuration object for Editor.js
   * @param {object} data.blocks - data to start with
   * @param {object} options
   * @param {string} options.headerPlaceholder - placeholder for Header tool
   */
  constructor(editorConfig = {}, options = {}) {
    const defaultConfig = {
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["bold","italic","link","Color"],
          config: {
            placeholder: options.headerPlaceholder || '',
          },
          tunes: ['anyTuneName'],
          shortcut: "CMD+SHIFT+H"
        },

        Color: {
          class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
          config: {
             colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
             defaultColor: '#FF1300',
             type: 'text',
             customPicker: true // add a button to allow selecting any colour
          }
        },
        Marker: {
          class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
          config: {
             defaultColor: '#FFBF00',
             type: 'marker',
             icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
            }
        },

        underline: Underline,

        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          tunes: ['anyTuneName']
        },

        anyTuneName: {
          class:AlignmentTuneTool,
          config:{
            default: "right",
            blocks: {
              header: 'left',
              list: 'right',
              paragraph: 'left'
            }
          },
        },

        image: {
          class: Image,
          inlineToolbar: true,
          config: {
            types: 'image/*',
            endpoints: {
              byFile: '/api/transport/image',
              byUrl: '/api/transport/fetch',
            },
          },
        },

        linkTool: {
          class: LinkTool,
          config: {
            endpoint: '/api/fetchUrl',
          },
        },

        code: {
          class: CodeTool,
          shortcut: 'CMD+SHIFT+D',
        },

        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'ordered'
          },
        },

        nestedList: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'ordered'
          },
        },

        delimiter: Delimiter,

        table: {
          class: Table,
          inlineToolbar: true,
        },

        warning: {
          class: Warning,
          inlineToolbar: true,
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        attaches: {
          class: AttachesTool,
          config: {
            endpoint: '/api/transport/file',
            buttonText: 'Upload File',
            types: 'application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            errorMessage: 'File Upload did not work. Contact xy'
          }
        },

        /**
         * Inline Tools
         */
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C',
        },

        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },

        raw: RawTool,

        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              miro: true,
              msstream: {
                regex: /https?:\/\/bollingergrohmann-my\.sharepoint\.com\/([-\]_.~!*'();:@&=+$,\/?%#[A-z0-9]*)\/stream\.aspx\?([-\]_.~!*'();:@&=+$,\/?%#[A-z0-9]*)/,
                embedUrl: 'https://bollingergrohmann-my.sharepoint.com/<%= remote_id %>',
                html: "<iframe height='100%' scrolling='no' allowtransparency='true' allow='fullscreen' style='width: 100%; height: 100%; border: none; '></iframe>",
                id: (groups) => groups.join('/embed.aspx?')
              },
              speckle: {
                regex: /https?:\/\/speckle\.bollinger-grohmann\.com\/projects\/([a-f0-9]{0,10})\/models\/([a-f0-9@,]{10,})/,
                embedUrl: 'https://speckle.bollinger-grohmann.com/projects/<%= remote_id %>',
                html: "<iframe height='100%' scrolling='no' allowtransparency='true' allow='fullscreen' style='width: 100%; height: 100%; border: none; '></iframe>",
                height: 500,
                width: 600,
                id: (groups) => groups.join('/models/') + '#embed=%7B%22isEnabled%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22hideControls%22%3Atrue%2C%22hideSelectionInfo%22%3Atrue%7D'
              },
              powerbi: {
                regex: /https?:\/\/app\.powerbi\.com\/view\?r=([A-z0-9]{10,})/,
                embedUrl: 'https://app.powerbi.com/view?r=<%= remote_id %>',
                html: "<iframe height='100%' scrolling='no' allowtransparency='true' allow='fullscreen' style='width: 100%; height: 100%; border: none; '></iframe>",
                height: 300,
                width: 600,
                id: (groups) => groups.join('')
              }
            }
          }
        }
      },

      onReady: () => {
        new Undo({ editor, config });
        new DragDrop(editor, 'none');
      },

      onChange: () => {
        console.log("changed");
        handleChange();
      },

      logLevel: "verbose",




      data: {
        blocks: [
          {
            type: 'header',
            data: {
              text: '',
              level: 2,
            },
          },
        ],
      },
    };

    this.editor = new EditorJS(Object.assign(defaultConfig, editorConfig));
  }

  /**
   * Return Editor data
   *
   * @returns {Promise.<{}>}
   */
  save() {
    return this.editor.saver.save();
  }
}

