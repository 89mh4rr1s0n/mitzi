import React from 'react'

type Props = {
  postsPerPage: number,
  totalPosts: number,
  paginate
}

const Pagination = ({ postsPerPage, totalPosts, paginate }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='flex justify-center'>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)}
          className='border m-1 rounded-sm w-5 text-center cursor-pointer hover:bg-slate-300' >
            {/* <a  href='!#' className='page-link'> */}
              {number}
            {/* </a> */}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination