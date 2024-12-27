import { BrowserService } from './browser.service';
export declare class BrowserController {
    private readonly browserService;
    constructor(browserService: BrowserService);
    closeEdgeBrowser(): Promise<string>;
    closeNodeProcesses(): Promise<string>;
    closeAllProcesses(): Promise<string>;
}
