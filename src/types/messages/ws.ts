export type MessageMap = Record<string, {
  request: unknown;
  response: unknown;
}>;

export type SocketMessageMap = {
  'browser_connect': {
    request: { url: string };
    response: { success: boolean; tabId?: string };
  };
  'browser_navigate': {
    request: { url: string };
    response: { success: boolean };
  };
  'browser_click': {
    request: { selector: string };
    response: { success: boolean };
  };
  'browser_drag': {
    request: { selector: string; direction: string };
    response: { success: boolean };
  };
  'browser_hover': {
    request: { selector: string };
    response: { success: boolean };
  };
  'browser_type': {
    request: { selector: string; text: string };
    response: { success: boolean };
  };
  'browser_select_option': {
    request: { selector: string; value: string };
    response: { success: boolean };
  };
  'browser_screenshot': {
    request: { selector?: string };
    response: { data: string }; // base64 encoded image
  };
  'browser_get_console_logs': {
    request: {};
    response: { logs: Array<{ level: string; message: string; timestamp: number }> };
  };
  'browser_snapshot': {
    request: {};
    response: { snapshot: any };
  };
  'browser_go_back': {
    request: {};
    response: { success: boolean };
  };
  'browser_go_forward': {
    request: {};
    response: { success: boolean };
  };
  'browser_wait': {
    request: { time: number };
    response: { success: boolean };
  };
  'browser_press_key': {
    request: { key: string };
    response: { success: boolean };
  };
  'getUrl': {
    request: {};
    response: { url: string };
  };
  'getTitle': {
    request: {};
    response: { title: string };
  };
};