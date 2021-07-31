
import {useDispatch,useSelector} from 'react-redux';
import {fetchposts} from '../store/actions/postAction';
import {useEffect} from 'react';


export default function Home() {


  const dispatch = useDispatch();
  const {posts} = useSelector(state=>state.post);
  useEffect(() => {
    dispatch(fetchposts());
  },[])
  return (
    
    <div>
      {posts&&posts.map(item=>(
        <h1 key = {item}>{item}</h1>
      ))}
    </div>
  )
}