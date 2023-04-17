import Search from './Search';
import Navbar from './Navbar';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
    </div>
  );
};

export default Sidebar;
