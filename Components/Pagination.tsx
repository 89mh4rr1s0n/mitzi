import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faBackwardStep, faCaretRight, faForwardStep } from '@fortawesome/free-solid-svg-icons'

type Props = {
  postsPerPage: number,
  totalPosts: number,
  paginate,
  pageNumber
}

const Pagination = ({ postsPerPage, totalPosts, paginate, pageNumber }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(Math.ceil(totalPosts / postsPerPage))

  return (
    Math.ceil(totalPosts / postsPerPage) > 1 &&
    <nav className='flex justify-center'>
      <ul className='flex border rounded-[4px]'>

        {/* previous and start icons */}
        <button
          className={`${pageNumber > 1 ? 'hover:bg-slate-300 cursor-pointer' : 'text-gray-300'}`}
          onClick={() => paginate(1)}
          disabled={pageNumber <= 1}
        >
          <FontAwesomeIcon icon={faBackwardStep} className='mx-1' />
        </button>
        <button
          className={`flex items-center ${pageNumber > 1 ? 'hover:bg-slate-300 cursor-pointer' : 'text-gray-300'}`}
          onClick={() => paginate(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          <FontAwesomeIcon icon={faCaretLeft} className='mx-1 h-5 mt-[1px]' />
        </button>

        {/* numbers */}
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)}
            className={`px-1 text-center cursor-pointer hover:bg-slate-300 hover:text-black 
            ${number === pageNumber && 'bg-theme-blue text-white'}`} >
            {number}
          </li>
        ))}

        {/* next and end icons */}
        <button
          className={`flex items-center ${pageNumber < Math.ceil(totalPosts / postsPerPage) ? 'hover:bg-slate-300 cursor-pointer' : 'text-gray-300'}`}
          onClick={() => paginate(pageNumber + 1)}
          disabled={pageNumber === Math.ceil(totalPosts / postsPerPage)}
        >
          <FontAwesomeIcon icon={faCaretRight} className='mx-1 h-5 mt-[1px]' />
        </button>
        <button
          className={`${pageNumber < Math.ceil(totalPosts / postsPerPage) ? 'hover:bg-slate-300 cursor-pointer' : 'text-gray-300'}`}
          onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
          disabled={pageNumber >= Math.ceil(totalPosts / postsPerPage)}
        >
          <FontAwesomeIcon icon={faForwardStep} className='mx-1 ' />
        </button>
      </ul>
    </nav>
  );
}

export default Pagination