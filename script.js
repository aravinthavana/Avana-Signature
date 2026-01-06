document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('signatureForm');
    const nameInput = document.getElementById('name');
    const designationInput = document.getElementById('designation');
    const mobileInput = document.getElementById('mobile');
    const companySelect = document.getElementById('company');
    const branchSelect = document.getElementById('branch');
    const signoffSelect = document.getElementById('signoffSelect');
    const signoffCustom = document.getElementById('signoffCustom');
    const copyBtn = document.getElementById('copyBtn');
    const copyStatus = document.getElementById('copyStatus');

    // Preview Elements
    const previewName = document.getElementById('previewName');
    const previewDesignation = document.getElementById('previewDesignation');
    const previewMobileLink = document.getElementById('previewMobileLink');
    const previewCompany = document.getElementById('previewCompany');
    const previewAddress = document.getElementById('previewAddress');
    const previewWebsite = document.getElementById('previewWebsite');
    const previewMobileContainer = document.getElementById('previewMobileContainer');
    const previewSignoff = document.getElementById('previewSignoff');
    const signaturePreviewContainer = document.getElementById('signaturePreview');

    // Social Link Elements
    const socialLinks = {
        facebook: document.getElementById('linkFacebook'),
        linkedin: document.getElementById('linkLinkedin'),
        instagram: document.getElementById('linkInstagram'),
        youtube: document.getElementById('linkYoutube'),
        x: document.getElementById('linkX')
    };

    // Data - Companies
    const companies = {
        'amd': {
            name: 'Avana Medical Devices Pvt Ltd.,',
            website: 'www.avanamedical.com',
            url: 'http://www.avanamedical.com',
            social: {
                instagram: 'https://www.instagram.com/avanamedical',
                facebook: 'https://www.facebook.com/AvanaMedical',
                x: 'https://x.com/AvanaMedical',
                linkedin: 'https://www.linkedin.com/company/avana-medical/',
                youtube: 'https://www.youtube.com/@avanamedical'
            }
        },
        'assp': {
            name: 'Avana Surgical Systems Pvt Ltd.,',
            website: 'https://avanasurgical.com/',
            url: 'https://avanasurgical.com/',
            social: {
                facebook: 'https://www.facebook.com/avanasurgical/',
                instagram: 'https://www.instagram.com/avana_surgical/',
                linkedin: 'https://www.linkedin.com/company/avana-surgical-systems-pvt-ltd/',
                youtube: 'https://www.youtube.com/@joint_arogyam'
            }
        },
        'ats': {
            name: 'Avana Technology Services Pvt Ltd.,',
            website: 'www.avanamedical.com',
            url: 'http://www.avanamedical.com',
            social: {
                instagram: 'https://www.instagram.com/avanatechnologyservices/',
                linkedin: 'https://www.linkedin.com/company/avana-technology-services/',
                x: 'https://x.com/avanatechnology',
                facebook: 'https://www.facebook.com/AvanaMedical',
                youtube: 'https://www.youtube.com/@avanamedical'
            }
        }
    };

    // Data - Branches
    const branches = {
        'chennai': 'No.91, Sundar Nagar 4th Avenue, Nandambakkam, Chennai – 600032, Tamil Nadu, India',
        'mumbai': 'The Summit Business Bay (Omkar) Office No. 606, 6th Floor, Andheri Kurla Road, Chakala, Andheri East, Mumbai – 400093',
        'delhi': 'Avana Medical Devices Pvt Ltd B6, Qutab Institutional Area New Delhi, Delhi – 110016',
        'bengaluru': 'No.52, 3rd Floor, Agastya Arcade, 80 feet Road, New BEL Rd, Devasandra Layout, Bengaluru – 560094, Karnataka, India',
        'logistics': '3/249F, 3/249G, Krishna Enclave, Parthasarathy Nagar, Manapakkam, Chennai – 600125, Tamil Nadu, India'
    };

    // Validation Function
    function validateForm() {
        // Required Fields
        const isNameValid = nameInput.value.trim() !== '';
        const isDesignationValid = designationInput.value.trim() !== '';

        // Mobile Validation
        const mobileValue = mobileInput.value.trim();
        const mobileRegex = /^[+]?[\d\s-]{10,}$/;
        // Valid if empty (because Optional) OR matches regex
        const isMobileValid = mobileValue === '' || mobileRegex.test(mobileValue);

        // Visual Feedback for Mobile
        if (!isMobileValid) {
            mobileInput.style.border = '1px solid red';
            mobileInput.title = 'Please enter a valid mobile number (e.g. +91 98765 43210)';
        } else {
            mobileInput.style.border = ''; // Reset
            mobileInput.title = '';
        }

        // Logic: All required fields valid AND mobile valid (if present)
        if (isNameValid && isDesignationValid && isMobileValid) {
            // Enable Copy Button
            copyBtn.disabled = false;
            copyBtn.style.opacity = '1';
            copyBtn.style.cursor = 'pointer';
            copyBtn.title = 'Click to copy signature';

            // Show Preview
            signaturePreviewContainer.style.display = 'block';
            signaturePreviewContainer.style.opacity = '1';
        } else {
            // Disable Copy Button
            copyBtn.disabled = true;
            copyBtn.style.opacity = '0.5';
            copyBtn.style.cursor = 'not-allowed';

            if (!isNameValid || !isDesignationValid) {
                copyBtn.title = 'Please fill in Name and Designation first';
            } else if (!isMobileValid) {
                copyBtn.title = 'Please enter a valid mobile number';
            }

            // Hide Preview
            signaturePreviewContainer.style.display = 'none';
        }
    }

    // Update Function
    function updateSignature() {
        // Sign-off Logic
        if (signoffSelect.value === 'custom') {
            signoffCustom.style.display = 'block';
            previewSignoff.textContent = signoffCustom.value || 'Thanks & Regards,';
        } else {
            signoffCustom.style.display = 'none';
            previewSignoff.textContent = signoffSelect.value;
        }

        // Text Inputs
        if (nameInput.value) previewName.textContent = nameInput.value;
        if (designationInput.value) previewDesignation.textContent = designationInput.value;

        // Mobile - Optional
        // Only update preview if valid or empty (but if invalid, validateForm hides the whole preview anyway)
        if (mobileInput.value && mobileInput.value.trim() !== '') {
            previewMobileContainer.style.display = 'block';
            previewMobileLink.textContent = mobileInput.value;
            // Remove spaces/dashes for tel link
            const cleanNumber = mobileInput.value.replace(/[^0-9+]/g, '');
            previewMobileLink.href = `tel:${cleanNumber}`;
        } else {
            previewMobileContainer.style.display = 'none';
        }

        // Company & Social
        const selectedCompany = companies[companySelect.value];
        if (selectedCompany) {
            previewCompany.textContent = selectedCompany.name;
            previewWebsite.textContent = selectedCompany.website;
            previewWebsite.href = selectedCompany.url;

            // Update Social Links
            for (const [platform, linkElement] of Object.entries(socialLinks)) {
                if (selectedCompany.social && selectedCompany.social[platform]) {
                    linkElement.style.display = 'inline-block';
                    linkElement.href = selectedCompany.social[platform];
                } else {
                    linkElement.style.display = 'none';
                }
            }
        }

        // Branch
        const selectedBranchAddress = branches[branchSelect.value];
        if (selectedBranchAddress) {
            previewAddress.textContent = selectedBranchAddress;
        }

        validateForm();
    }

    // Event Listeners
    nameInput.addEventListener('input', updateSignature);
    designationInput.addEventListener('input', updateSignature);
    mobileInput.addEventListener('input', updateSignature);
    companySelect.addEventListener('change', updateSignature);
    branchSelect.addEventListener('change', updateSignature);
    signoffSelect.addEventListener('change', updateSignature);
    signoffCustom.addEventListener('input', updateSignature);

    // Initial Load
    updateSignature();

    // Copy Functionality
    copyBtn.addEventListener('click', () => {
        const signatureRange = document.createRange();
        signatureRange.selectNodeContents(document.getElementById('signaturePreview'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(signatureRange);

        try {
            document.execCommand('copy');
            window.getSelection().removeAllRanges();

            copyStatus.textContent = 'Signature copied to clipboard!';
            copyStatus.style.color = 'green';
            setTimeout(() => {
                copyStatus.textContent = '';
            }, 3000);
        } catch (err) {
            copyStatus.textContent = 'Failed to copy. Please select and copy manually.';
            copyStatus.style.color = 'red';
        }
    });
});
