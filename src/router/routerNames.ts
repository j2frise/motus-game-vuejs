type RouteType = {
  name: string;
  desc?: string;
  title?: string;
};

type RouteNameType = {
  HOME: RouteType;
  ERROR404: RouteType;
};

const RouteNames: RouteNameType = {
  HOME: {
    name: 'home_page',
  },
  ERROR404: {
    name: 'not_found_page',
  },
};

export default RouteNames;
