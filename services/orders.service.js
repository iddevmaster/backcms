

export const OrdersService = {
    saveorder(params) {
        return ApiService.post("orders", params);
    },
};
