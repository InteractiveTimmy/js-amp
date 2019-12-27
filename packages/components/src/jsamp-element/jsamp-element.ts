export default class JSAMPElement extends HTMLElement {
  protected pState: Record<string, string>;
  protected pProps: Record<string, string>;

  public constructor() {
    super();

    this.pProps = {};
    this.pState = {};
  }

  public get props(): Record<string, string> { return { ...this.pProps }; }
  public get state(): Record<string, string> { return { ...this.pState }; }

  protected pUpdateProps(): void {
    this.pProps = {};

    for (let i = 0; i < this.attributes.length; i += 1) {
      this.pProps[
        this.attributes[i].name
          .split('-')
          .map((item, index): string => {
            if (index === 0) { return item; }
            return `${item.charAt(0).toUpperCase()}${item.substring(1)}`;
          })
          .join('')
      ] = this.attributes[i].value;
    }
  }

  public connectedCallback(): void {
    this.pUpdateProps();

    this.innerHTML = this.render();
  }

  public render(): string {
    const { data } = this.props;
    return (`<div>${data}</div>`);
  }
}

customElements.define('jsamp-element', JSAMPElement);
