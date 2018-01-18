import React from 'react'
import { Link } from 'react-router-dom'

const CategoryList = ({categories}) => {
  return (
      <div className='categories'>
        <ul>
          {categories.map((category) => (
              <li key={category.name}><Link to={`/${category.path}`}>{category.name}</Link></li>
          ))}
        </ul>
      </div>
  )
};

export default CategoryList