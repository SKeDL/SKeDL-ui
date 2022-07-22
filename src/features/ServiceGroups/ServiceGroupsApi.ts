import { AppApi } from './../api/AppApi';
import { ServiceGroup } from '../../types/ServiceGroup';

export const ServiceGroupApi = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    listServiceGroups: builder.query<ServiceGroup[], void>({
      query: () => '/service_groups',
    }),
  }),
  overrideExisting: false,
});

export const { useListServiceGroupsQuery } = ServiceGroupApi;
