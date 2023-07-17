import ReactMarkdown from 'react-markdown'

interface IMarkdownProps {
  children: string
}

export const Markdown = ({ children }: IMarkdownProps) => {
  return (

    <ReactMarkdown components={{
      h1: ({ node, ...props }) => <h1 className='' {...props} />,
      h2: ({ node, ...props }) => <h2 className='' {...props} />,
      h3: ({ node, ...props }) => <h1 className='text-2xl text-gray-900 dark:text-gray-100 mb-2 mt-6' {...props} />,
      h4: ({ node, ...props }) => <h4 className='text-xl text-gray-900 dark:text-gray-100 mb-2 mt-4' {...props} />,
      h5: ({ node, ...props }) => <h5 className='' {...props} />,
      h6: ({ node, ...props }) => <h6 className='' {...props} />,
      a: ({ node, ...props }) => <a className='' {...props} />,
      blockquote: ({ node, ...props }) => <blockquote className='' {...props} />,
      br: ({ node, ...props }) => <br className='' {...props} />,
      code: ({ node, ...props }) => <code className='' {...props} />,
      em: ({ node, ...props }) => <em className='italic' {...props} />,
      hr: ({ node, ...props }) => <hr className='' {...props} />,
      img: ({ node, ...props }) => <img className='' {...props} />,
      ul: ({ node, ...props }) => <ul className='relative' {...props} />,
      ol: ({ node, ...props }) => <ol className='' {...props} />,
      li: ({ node, ...props }) => <li className='list-disc my-2 left-5 pl-2 relative' {...props} />,
      p: ({ node, ...props }) => <p className='mb-2' {...props} />,
      pre: ({ node, ...props }) => <pre className='' {...props} />,
      strong: ({ node, ...props }) => <strong className='' {...props} />,
    }}>
      {children}
    </ReactMarkdown>
  )
}
