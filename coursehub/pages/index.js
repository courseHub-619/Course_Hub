
import {useDispatch,useSelector} from 'react-redux';
import {fetchposts} from '../store/actions/postAction';
import {useEffect} from 'react';
import App from './components/App';


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
       <h1 className=" text-red-900 text-9xl ">helloo world</h1>
<App/>
    </div>
  )
}