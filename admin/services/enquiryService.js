const Enquiry = require('../../models/enquiryModel');



exports.getAllEnquiries = async () => {
    try {
        const enquiries = await Enquiry.aggregate([
            { $sort: { createdAt: -1 } }
        ]);

        return { status: true, message: 'Enquiries fetched successfully', data: enquiries };
    } catch (error) {
        console.error('Service Error - getAllEnquiries:', error);
        return { status: false, message: 'Failed to fetch enquiries', error: error.message };
    }
};

exports.updateEnquiryStatus = async (req) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log('Updating enquiry status:', { id, status });

        if (!['new', 'responded', 'closed'].includes(status)) {
            return { status: false, message: 'Invalid status value' };
        }

        const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });

        if (!updated) {
            return { status: false, message: 'Enquiry not found' };
        }

        return { status: true, message: 'Status updated', data: updated };
    } catch (error) {
        console.error('Service Error - updateEnquiryStatus:', error);
        return { status: false, message: 'Failed to update status', error: error.message };
    }
};
