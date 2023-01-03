import { mdiHome } from '@mdi/js';
import { NavLink } from 'react-router-dom';
import IconButton from '../../components/IconButton';

const NotFound = () => {
  return (
    <div className="flex flex-wrap h-full w-full content-center justify-center">
      <div className="h-2/6 w-2/6 rounded-lg p-6">
        <div className="flex h-full w-full flex-col justify-center items-center">
          <div className="text-4xl">Page Not Found.</div>
          <div className="py-4 flex flex-shrink">
            <NavLink to="/">
              <IconButton title='Return Home' icon={mdiHome} iconColor='white' />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
