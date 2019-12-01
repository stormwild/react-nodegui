import { QScrollArea, NodeWidget, AlignmentFlag } from "@nodegui/nodegui";
import { ViewProps, setViewProps } from "../View/RNView";
import { RNWidget } from "../config";

export interface ScrollAreaProps extends ViewProps {
  // TODO add props
  widgetResizable?: boolean;
  alignment?: AlignmentFlag;
}

const setScrollAreaProps = (
  widget: RNScrollArea,
  newProps: ScrollAreaProps,
  oldProps: ScrollAreaProps
) => {
  const setter: ScrollAreaProps = {
    //TODO add props
    set widgetResizable(resizable: boolean) {
      widget.setWidgetResizable(resizable);
    },
    set alignment(align: AlignmentFlag) {
      widget.setProperty("alignment", align);
    }
  };
  Object.assign(setter, newProps);
  setViewProps(widget, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNScrollArea extends QScrollArea implements RNWidget {
  setProps(newProps: ScrollAreaProps, oldProps: ScrollAreaProps): void {
    setScrollAreaProps(this, newProps, oldProps);
  }
  removeChild(child: NodeWidget): void {
    const removedChild = this.takeWidget();
    if (removedChild) {
      removedChild.close();
    }
    child.close();
  }
  appendInitialChild(child: NodeWidget): void {
    if (this.contentWidget) {
      console.warn("ScrollView can't have more than one child node");
      return;
    }
    this.setWidget(child);
  }
  appendChild(child: NodeWidget): void {
    this.appendInitialChild(child);
  }
  insertBefore(child: NodeWidget, beforeChild: NodeWidget): void {
    this.appendInitialChild(child);
  }
  static tagName = "scrollarea";
}
