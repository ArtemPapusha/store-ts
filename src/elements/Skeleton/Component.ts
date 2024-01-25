import style from "./style.module.scss"
import flex from "@style/utils/flex.module.scss"
import space from "@style/utils/space.module.scss"
import sizes from "@style/utils/sizes.module.scss"

import {
  type SkeletonInterface
} from "./type"

class Skeleton implements SkeletonInterface {
  public $skeletonContainer: HTMLElement | null = null;
  
  
  public buildSkeletonProduct = (count: number): HTMLDivElement => {
    const $skeletonContainer = document.createElement('div');
    $skeletonContainer.className = [
      flex[`d-flex`],
      flex[`just-content-center`],
      flex[`flex-direction-row`],
      flex[`flex-wrap-wrap`],
    ].join(' ');

    for (let i = 0; i < count; i++) {
      const $cardWrapperSkeleton = document.createElement('div');
      $cardWrapperSkeleton.className = [
        style.card_wrapper_skeleton,
        flex[`d-flex`],
        flex[`just-content-flex-start`],
        flex[`flex-direction-column`],
        flex[`align-items-center`],
        flex[`align-self-flex-start`],
        sizes[`wd-20`],
        space[`py-3`],
        space[`px-3`],
        space[`gap-10`],
        space[`my-3`],
        space[`mx-3`],
      ].join(' ');
      
      $cardWrapperSkeleton.appendChild(this.buildSkeletonTitle());
      $cardWrapperSkeleton.appendChild(this.buildSkeletonImage());
  
      const $footerCardProductSkeleton = document.createElement('div');
      $footerCardProductSkeleton.className = [
        style.footer_card_product_skeleton,
        flex[`d-flex`],
        flex[`just-content-space-between`],
        flex[`align-items-center`],
        space[`gap-15`],
      ].join(' ');
      
      const $priceSkeleton = document.createElement('div');
      $priceSkeleton.className = [
        style.price_skeleton,
        style.skeleton,
      ].join(' ');
     
      $footerCardProductSkeleton.appendChild($priceSkeleton);
      $footerCardProductSkeleton.appendChild(this.buildSkeletonButton());
      $footerCardProductSkeleton.appendChild(this.buildSkeletonButton());
  
      $cardWrapperSkeleton.appendChild($footerCardProductSkeleton);
      $skeletonContainer.appendChild($cardWrapperSkeleton);
    }
  
    return $skeletonContainer;
  }

  protected buildSkeletonTitle = () => {
    const $titleSkeleton = document.createElement('div');

    $titleSkeleton.className = [
      style.title_skeleton,
      sizes['wd-100p'],
    ].join(' ');
  
    for (let i = 0; i < 3; i++) {
      const $titleSkeletonElement = document.createElement('div');

      $titleSkeletonElement.className = [
        style.title_skeleton_element,
        style.skeleton,
        sizes['wd-100p'],
      ].join(' ');
      
      $titleSkeleton.appendChild($titleSkeletonElement);
    }

    return $titleSkeleton;
  }
  
  protected buildSkeletonImage = () => {
    const $imageSkeleton = document.createElement('div');

    $imageSkeleton.className = [
      style.image_skeleton,
      style.skeleton,
      sizes['wd-100p'],
    ].join(' ');

    return $imageSkeleton;
  }
  
  protected buildSkeletonButton = () => {
    const $buttonSkeleton = document.createElement('div');

    $buttonSkeleton.className = [
      style.button_skeleton,
      style.skeleton,
    ].join(' ');
    
    return $buttonSkeleton;
  }
  
  public buildSkeletonPagination = (): this =>{
    const $skeletonPagiantionWrapper = document.createElement('ul');
    $skeletonPagiantionWrapper.className = [
      style.pagination_container_skelton,
      flex[`d-flex`],
      flex[`just-content-center`],
      flex[`align-items-center`],
      space[`gap-2`],
    ].join(' ');
    
    for (let i = 0; i < 8; i++) {
      const $skeletonPagiantionElement = document.createElement('li');
      $skeletonPagiantionElement.className = [
        style.pagination_skeleton,
        style.skeleton,
      ].join(' ');
 
      $skeletonPagiantionWrapper.appendChild($skeletonPagiantionElement);
    }

    document.body.appendChild($skeletonPagiantionWrapper);

    return this;
  }
}
  
  export default Skeleton;