import { ReactNode } from "react"
import { StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Modal, ModalProps } from "../Modal"
import { Text, TextProps } from "../Text"
import { Button } from "../Button"
import { Icon, IconTypes } from "../Icon"

type DialogVariant = "default" | "danger" | "warning" | "success"

export interface ConfirmationDialogProps extends Omit<ModalProps, "children" | "FooterComponent"> {
  /**
   * Dialog variant/type
   * @default "default"
   */
  variant?: DialogVariant
  /**
   * Icon to show at top of dialog
   */
  icon?: IconTypes
  /**
   * Title text
   */
  title?: string
  /**
   * Title i18n key
   */
  titleTx?: TextProps["tx"]
  /**
   * Message/description text
   */
  message?: string
  /**
   * Message i18n key
   */
  messageTx?: TextProps["tx"]
  /**
   * Confirm button text
   * @default "Confirm"
   */
  confirmText?: string
  /**
   * Confirm button i18n key
   */
  confirmTx?: TextProps["tx"]
  /**
   * Cancel button text
   * @default "Cancel"
   */
  cancelText?: string
  /**
   * Cancel button i18n key
   */
  cancelTx?: TextProps["tx"]
  /**
   * Callback when confirm is pressed
   */
  onConfirm: () => void
  /**
   * Callback when cancel is pressed (defaults to onClose)
   */
  onCancel?: () => void
  /**
   * Whether confirm action is in progress
   * @default false
   */
  confirmLoading?: boolean
  /**
   * Additional content between message and buttons
   */
  children?: ReactNode
}

/**
 * ConfirmationDialog component for user confirmations.
 * Built on top of Modal with pre-styled confirmation UI.
 *
 * @param {ConfirmationDialogProps} props - The props for the `ConfirmationDialog` component.
 * @returns {JSX.Element} The rendered `ConfirmationDialog` component.
 *
 * @example
 * <ConfirmationDialog
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item? This action cannot be undone."
 *   variant="danger"
 *   onConfirm={handleDelete}
 * />
 */
export function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    variant = "default",
    icon,
    title,
    titleTx,
    message,
    messageTx,
    confirmText = "Confirm",
    confirmTx,
    cancelText = "Cancel",
    cancelTx,
    onConfirm,
    onCancel,
    onClose,
    confirmLoading = false,
    children,
    showCloseButton = false,
    ...modalProps
  } = props

  const { themed, theme } = useAppTheme()

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  const variantColors: Record<DialogVariant, string> = {
    default: theme.colors.palette.ocean500,
    danger: theme.colors.palette.coral500,
    warning: theme.colors.palette.sunset400,
    success: theme.colors.palette.seafoam400,
  }

  const confirmPreset = variant === "danger" ? "filled" : "filled"

  const Footer = (
    <View style={themed($footerContainer)}>
      <Button
        text={cancelText}
        tx={cancelTx}
        preset="default"
        onPress={handleCancel}
        disabled={confirmLoading}
        style={themed($button)}
      />
      <Button
        text={confirmText}
        tx={confirmTx}
        preset={confirmPreset}
        onPress={onConfirm}
        disabled={confirmLoading}
        style={[
          themed($button),
          variant === "danger" && { backgroundColor: theme.colors.palette.coral500 },
          variant === "warning" && { backgroundColor: theme.colors.palette.sunset400 },
          variant === "success" && { backgroundColor: theme.colors.palette.seafoam400 },
        ]}
      />
    </View>
  )

  return (
    <Modal
      {...modalProps}
      onClose={onClose}
      showCloseButton={showCloseButton}
      size="sm"
      FooterComponent={Footer}
    >
      <View style={themed($content)}>
        {icon && (
          <View style={[themed($iconContainer), { backgroundColor: variantColors[variant] + "20" }]}>
            <Icon icon={icon} size={32} color={variantColors[variant]} />
          </View>
        )}
        {(title || titleTx) && (
          <Text
            text={title}
            tx={titleTx}
            preset="subheading"
            style={themed($title)}
          />
        )}
        {(message || messageTx) && (
          <Text
            text={message}
            tx={messageTx}
            style={themed($message)}
          />
        )}
        {children}
      </View>
    </Modal>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingVertical: spacing.sm,
})

const $iconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 64,
  height: 64,
  borderRadius: 32,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.md,
})

const $title: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  textAlign: "center",
  color: colors.palette.sand900,
  marginBottom: spacing.xs,
})

const $message: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.palette.sand600,
})

const $footerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $button: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
