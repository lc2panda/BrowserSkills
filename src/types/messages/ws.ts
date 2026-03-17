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
    request: { element: string; ref: string };
    response: unknown;
  };
  'browser_drag': {
    request: { startElement: string; startRef: string; endElement: string; endRef: string; direction?: string };
    response: unknown;
  };
  'browser_hover': {
    request: { element: string; ref: string };
    response: unknown;
  };
  'browser_type': {
    request: { element: string; ref: string; text: string; submit?: boolean };
    response: unknown;
  };
  'browser_select_option': {
    request: { element: string; ref: string; values: string[] };
    response: unknown;
  };
  'browser_screenshot': {
    request: { selector?: string };
    response: { data: string }; // base64 encoded image
  };
  'browser_fullpage_screenshot': {
    request: {};
    response: { data: string }; // base64 encoded full-page image
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
  'browser_scroll': {
    request: { x: number; y: number; deltaX: number; deltaY: number };
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