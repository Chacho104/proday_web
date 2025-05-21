// A simple notifications component: just a badged icon
// Functionality to come later

import BadgedIcon from "@/app/components/ui-elements/general/badged-icon";
import { IoMdNotificationsOutline } from "react-icons/io";

const Notifications = () => {
  return <BadgedIcon icon={IoMdNotificationsOutline} count={0} />;
};

export default Notifications;
