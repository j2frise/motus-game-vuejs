type RouteType = {
  name: string;
  desc?: string;
  title?: string;
};

type RouteNameType = {
  HOME: RouteType;
  RESULT: RouteType;
  REGISTER: RouteType;
  ERROR404: RouteType;
};

const RouteNames: RouteNameType = {
  HOME: {
    name: 'home_page',
  },
  RESULT: {
    name: 'result_page',
  },
  REGISTER: {
    name: 'game__register_page',
  },
  ERROR404: {
    name: 'not_found_page',
  },
};

export default RouteNames;
