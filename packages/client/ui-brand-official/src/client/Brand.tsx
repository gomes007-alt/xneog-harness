import { BrandMark, BrandWordmark } from '@xneog/dsh-client-ui-primitives'
import type { SidebarBrandMarkOwnerProps } from '@xneog/dsh-client-ui-sidebar/client'

/**
 * The official brand mark is the xneog "x" shared by the primitives;
 * the upstream whale silhouette is retired.
 */

/**
 * Render the official mark with the presentation requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the official xneog x mark.
 */
export function OfficialBrandMark({ size }: SidebarBrandMarkOwnerProps) {
  return <BrandMark size={size} />
}

/**
 * Render the official name artwork without its independently slotted mark.
 * @returns the official name wordmark.
 */
export function OfficialBrandName() {
  return <BrandWordmark includeMark={false} />
}
