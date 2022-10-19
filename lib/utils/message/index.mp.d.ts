declare const Message: {
    info(options: Record<string, any>): any;
    success(options: Record<string, any>): any;
    warning(options: Record<string, any>): any;
    error(options: Record<string, any>): any;
    hide(context: any): void;
};
export default Message;
