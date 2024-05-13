import React from 'react'

const Tags = ({allBlogs,setSearchBlogs,searchBlogs}) => {

 var uniqarra = [ ...new Set(allBlogs?.map((blogs) =>blogs?.title.substring(0, 5).toLowerCase())) ]

  return (
    <>
    {uniqarra.length>0 && <div className={`tags ${searchBlogs === "" ? "active" : ""}`} onClick={()=>setSearchBlogs("")}> All </div>}
    {uniqarra?.sort().map((tags,id)=>(
        <li key={id} className={`tags ${tags === searchBlogs ? "active" : ""}`} onClick={()=>setSearchBlogs(tags)}>{tags} </li>
    ))}
    </>
  )
}

export default Tags