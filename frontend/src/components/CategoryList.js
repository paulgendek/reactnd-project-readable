import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoryList = ({categories}) => {
  return (
      <div className='categories'>
        <ul>
          <li><NavLink to='/' exact activeStyle={{
            fontWeight: 'bold',
            color: 'red'
          }}>All Posts</NavLink></li>
          {categories.map((category) => (
              <li key={category.name}><NavLink to={`/${category.path}`} exact activeStyle={{
                fontWeight: 'bold',
                color: 'red'
              }}>{category.name}</NavLink></li>
          ))}
        </ul>
      </div>
  )
};

export default CategoryList