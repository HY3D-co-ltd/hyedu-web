'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import { useRef, useState } from 'react';
import { uploadImage } from '@/lib/image-upload';

const COLORS = [
  '#000000',
  '#404040',
  '#808080',
  '#c0c0c0',
  '#e91e63',
  '#f44336',
  '#ff9800',
  '#ffc107',
  '#4caf50',
  '#00bcd4',
  '#2196f3',
  '#3f51b5',
  '#9c27b0',
  '#336666', // point
];

export default function RichEditor({
  value,
  onChange,
  imageFolder,
}: {
  value: string;
  onChange: (html: string) => void;
  imageFolder: string; // 예: 'board/reviews'
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[300px] px-4 py-3 focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden bg-white">
      <Toolbar editor={editor} imageFolder={imageFolder} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({
  editor,
  imageFolder,
}: {
  editor: Editor;
  imageFolder: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showColors, setShowColors] = useState(false);

  async function handleInsertImage(file: File) {
    setUploading(true);
    try {
      const url = await uploadImage(file, imageFolder);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err) {
      alert(err instanceof Error ? err.message : '이미지 업로드 실패');
    } finally {
      setUploading(false);
    }
  }

  function setLink() {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('링크 주소 (빈 값으로 두면 제거):', prev ?? '');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-1 px-2 py-2 border-b border-gray-200 bg-gray-50 text-sm">
      <Btn
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="굵게 (Ctrl+B)"
      >
        <b>B</b>
      </Btn>
      <Btn
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="기울임 (Ctrl+I)"
      >
        <i>I</i>
      </Btn>
      <Btn
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="밑줄 (Ctrl+U)"
      >
        <u>U</u>
      </Btn>
      <Btn
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="취소선"
      >
        <s>S</s>
      </Btn>
      <Sep />
      <Btn
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="큰 제목"
      >
        H1
      </Btn>
      <Btn
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="중간 제목"
      >
        H2
      </Btn>
      <Btn
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="작은 제목"
      >
        H3
      </Btn>
      <Sep />
      <div className="relative">
        <Btn
          onClick={() => setShowColors((s) => !s)}
          title="글자색"
        >
          🎨
        </Btn>
        {showColors && (
          <div className="absolute top-full left-0 mt-1 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-wrap gap-1 w-[140px]">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className="w-6 h-6 rounded border border-gray-300"
                style={{ background: c }}
                onClick={() => {
                  editor.chain().focus().setColor(c).run();
                  setShowColors(false);
                }}
                aria-label={c}
              />
            ))}
            <button
              type="button"
              className="text-xs text-gray-500 w-full mt-1"
              onClick={() => {
                editor.chain().focus().unsetColor().run();
                setShowColors(false);
              }}
            >
              색상 제거
            </button>
          </div>
        )}
      </div>
      <Sep />
      <Btn
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="글머리 기호 목록"
      >
        •
      </Btn>
      <Btn
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="숫자 목록"
      >
        1.
      </Btn>
      <Sep />
      <Btn
        active={editor.isActive({ textAlign: 'left' })}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        title="왼쪽 정렬"
      >
        ≡
      </Btn>
      <Btn
        active={editor.isActive({ textAlign: 'center' })}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        title="가운데 정렬"
      >
        ⫯
      </Btn>
      <Btn
        active={editor.isActive({ textAlign: 'right' })}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        title="오른쪽 정렬"
      >
        ≡
      </Btn>
      <Sep />
      <Btn onClick={setLink} active={editor.isActive('link')} title="링크">
        🔗
      </Btn>
      <Btn
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        title="이미지 삽입 (자동 축소)"
      >
        {uploading ? '⏳' : '🖼️'}
      </Btn>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleInsertImage(f);
          e.target.value = '';
        }}
      />
      <div className="flex-1" />
      <Btn
        onClick={() => editor.chain().focus().undo().run()}
        title="되돌리기"
      >
        ↶
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().redo().run()}
        title="다시"
      >
        ↷
      </Btn>
    </div>
  );
}

function Btn({
  children,
  onClick,
  active,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`min-w-[28px] h-8 px-2 rounded hover:bg-gray-200 disabled:opacity-50 ${
        active ? 'bg-gray-300' : ''
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="inline-block w-px h-5 bg-gray-300 mx-1" />;
}
