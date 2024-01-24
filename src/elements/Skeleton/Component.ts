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
      
      // `d-flex flex-direction-row just-content-center flex-wrap-wrap`;
    
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
        
        // `card_wrapper_skeleton d-flex just-content-flex-start flex-direction-column align-items-center align-self-flex-start wd-20 py-3 px-3 gap-10 my-3 mx-3`;
    
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
        
        // `price_skeleton skeleton`;

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
      
      // `title_skeleton wd-100p`;
  
      for (let i = 0; i < 3; i++) {
      const $titleSkeletonElement = document.createElement('div');
  
      $titleSkeletonElement.className = [
        style.title_skeleton_element,
        style.skeleton,
        sizes['wd-100p'],
      ].join(' ');
      
      // `title_skeleton_element wd-100p skeleton`;
  
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
      
      // `image_skeleton wd-100p skeleton`;
  
      return $imageSkeleton;
    }
  
    protected buildSkeletonButton = () => {
      const $buttonSkeleton = document.createElement('div');
  
      $buttonSkeleton.className = [
        style.button_skeleton,
        style.skeleton,
      ].join(' ');
      
      // `button_skeleton skeleton`;
  
      return $buttonSkeleton;
    }
  
    public buildSkeletonPagination = (): this =>{
      const $skeletonPagiantionWrapper = document.createElement('ul');
      $skeletonPagiantionWrapper.className = [
        style.pagination_container_skelton,
        style.pagination_container,
        flex[`d-flex`],
        flex[`just-content-center`],
        flex[`align-items-center`],
        space[`gap-2`],
      ].join(' ');
      
      // 'pagination_container_skelton pagination_container d-flex just-content-center align-items-center gap-2'
  
      for (let i = 0; i < 7; i++) {
        const $skeletonPagiantionElement = document.createElement('li');
        $skeletonPagiantionElement.className = [
          style.pagination_skeleton,
          style.skeleton,
        ].join(' ');
        
        // 'pagination_skeleton skeleton';
  
        $skeletonPagiantionWrapper.appendChild($skeletonPagiantionElement);
      }
  
      document.body.appendChild($skeletonPagiantionWrapper);
  
      return this;
    }
  }
  
  export default Skeleton;