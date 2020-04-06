<?php
/**
 * Template Name: Контакты
 * Template Post Type: page
 */
include( locate_template('blocks/variables/var-general.php' ));
include( locate_template('blocks/variables/var-contacts.php' ));
include( locate_template('header.php' ));
?>

<main class="contacts__main" style="background-image: url(<?php echo esc_url($contacts_bg['url']); ?>);">
    <section class="container contacts__main-container">
        <h1 class="h1 page-title contacts__h1"><?php echo wp_kses($page_title, $allowed_to_kses); ?></h1>
        <p class="contacts__subtitle"><?php echo wp_kses($contacts_subtitle, $allowed_to_kses); ?></p>
        <div class="contacts__info">
            <div class="contacts__text-bl">
                <section class="contacts__country contacts__canada">
                    <h2 class="contacts__country-name"><?php echo esc_html($contacts_canada_name); ?></h2>
                    <ul class="contacts__country-list">
                        <li class="contacts__country-item contacts__country-item-adress">
                            <a href="javascript:void(0);" class="contacts__country-link contacts__address"><?php echo wp_kses($contacts_canada['adress'], $allowed_to_kses); ?></a>
                        </li>
                        <li class="contacts__country-item contacts__country-item-mail">
                            <a href="mailto:<?php echo esc_attr($contacts_canada['mail']); ?>" title="Send a mail" class="contacts__country-link contacts__mail"><?php echo esc_attr($contacts_canada['mail']); ?></a>
                        </li>
                        <li class="contacts__country-item contacts__country-item-phone">
                            <a href="tel:<?php echo esc_attr($contacts_canada['phone']); ?>" title="Make a phone-call" class="contacts__country-link contacts__phone"><?php echo esc_attr($contacts_canada['phone']); ?></a>
                        </li>
                        <li class="contacts__country-item contacts__country-item-messenger">
                            <a href="whatsapp://send?phone=<?php echo esc_attr($contacts_canada['whatsapp']); ?>" title="Use Whatsapp" class="contacts__country-link contacts__messenger contacts__whatsapp messenger-whatsapp"></a>
                            <a href="viber://add?number=<?php echo esc_attr($contacts_canada['viber']); ?>" title="Use Viber" class="contacts__country-link contacts__messenger contacts__viber messenger-viber"></a>
                        </li>
                    </ul>
                </section>
                <section class="contacts__country contacts__russia">
                    <h2 class="contacts__country-name"><?php echo esc_html($contacts_russia_name); ?></h2>
                    <ul class="contacts__country-list">
                        <li class="contacts__country-item contacts__country-item-adress">
                            <p  class="contacts__country-link contacts__address"><?php echo wp_kses($contacts_russia['adress'], $allowed_to_kses); ?></p>
                        </li>
                        <li class="contacts__country-item contacts__country-item-mail">
                            <a href="mailto:<?php echo esc_attr($contacts_russia['mail']); ?>" title="Send a mail" class="contacts__country-link contacts__mail"><?php echo esc_attr($contacts_russia['mail']); ?></a>
                        </li>
                        <li class="contacts__country-item contacts__country-item-phone">
                            <a href="tel:<?php echo esc_attr($contacts_russia['phone']); ?>" title="Make a phone-call phone" class="contacts__country-link contacts__phone"><?php echo esc_attr($contacts_russia['phone']); ?></a>
                        </li>
                        <li class="contacts__country-item contacts__country-item-messenger">
                            <a href="whatsapp://send?phone=<?php echo esc_attr($contacts_russia['whatsapp']); ?>" title="Use Whatsapp" class="contacts__country-link contacts__messenger contacts__whatsapp messenger-whatsapp"></a>
                            <a href="viber://add?number=<?php echo esc_attr($contacts_russia['viber']); ?>" title="Use Viber" class="contacts__country-link contacts__messenger contacts__viber messenger-viber"></a>
                        </li>
                    </ul>
                </section>
                <div class="contacts__details">
                    <div class="contacts__social">
                        <h2 class="contacts__social-bl-name"><?php echo wp_kses($contacts_social_title, $allowed_to_kses); ?></h2>
                        <?php include( locate_template('blocks/html-blocks/block-social-white-quadro.php' )); ?>
                    </div>

                    <?php if ($pay_details): ?>
                        <div class="payment_details_bl">
                            <h2 class="contacts__payment_details_title"><?php echo wp_kses($contacts_doc, $allowed_to_kses); ?></h2>
                            <a href="<?php echo esc_url($pay_details); ?>" target="_blank" class="contacts__payment_details_link"><?php echo wp_kses($contacts_doc_link, $allowed_to_kses); ?></a>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            <section class="contacts__sendmessage">
                <div class="container contacts__sendmessage-container">
                    <h2 class="contacts__sendmessage-subtitle"><?php echo wp_kses($contacts_form_text, $allowed_to_kses);?></h2>
                    <?php include( locate_template('blocks/forms/form-sendmessage.php') ); ?>
                </div>
            </section>
        </div>
        
    </section>
</main>

<?php get_footer(); ?>
