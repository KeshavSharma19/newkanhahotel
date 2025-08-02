

exports.viewgallery = async () => {
    try {
        
    } catch (error) {
        console.error('Service Error - submitEnquiry:', error);
        return {
          status: false,
          message: 'Failed to submit enquiry',
          error: error.message
        };
    }
}