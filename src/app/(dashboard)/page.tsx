import { auth } from '@/lib/auth';
import { HomeViews } from '@/modules/home/ui/views/home-views';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/sign-in');
  }
  return <HomeViews />;
};
export default Page;
