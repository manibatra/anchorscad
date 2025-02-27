'''
A circular pipe with a hole shape in the centre.

Created on 26 Jan 2021

@author: gianni
'''

import anchorscad as ad


@ad.shape('anchorscad/models/basic/pipe')
@ad.datatree
class Pipe(ad.CompositeShape):
    '''
    A pipe. Inner hollow part is a hole.
    '''
    h: float
    inside_r: float
    outside_r: float
    inside_cyl_node: ad.Node=ad.ShapeNode(ad.Cylinder, {'r': 'inside_r'})
    outside_cyl_node: ad.Node=ad.ShapeNode(ad.Cylinder, 'h', {'r': 'outside_r'})
    hole_h_delta: float=0.01  # Prevents tearing in preview mode.
    
    EXAMPLE_SHAPE_ARGS=ad.args(h=50, inside_r=6, outside_r=10)
    EXAMPLE_ANCHORS=(
        ad.surface_args('top'),
        ad.surface_args('base'),
        ad.surface_args('surface', 50, 0),
        ad.surface_args('inner_surface', 0, 45),
        )
    
    def build(self) -> ad.Maker:
        assert self.outside_r > self.inside_r, (
            f'Inside radius ({self.inside_r}) must be smaller than outside ({self.outside_r}')
        maker = self.outside_cyl_node().solid('outer').at('centre')
        
        maker.add(self.inside_cyl_node(
            h=self.h + self.hole_h_delta).hole('inner').at('centre'))
        
        return maker

    @ad.anchor('inner surface anchor')
    def inner_surface(self, *args, **kwds):
        '''Inner surface anchor with corrected Z points away from surface.'''
        return self.maker.at('inner', 'surface', *args, **kwds) * ad.ROTX_180


@ad.shape
@ad.datatree
class TeePipe(ad.CompositeShape):
    '''
    A Tee pipe.
    '''
    through_h: float=50
    tee_h: float=30
    tee_pos: float=25
    inside_r: float=8
    outside_r: float=10
    skew: float=ad.dtfield(0, doc='Skew angle of tee pipe')
    through_node: ad.Node=ad.ShapeNode(Pipe, {'h': 'through_h'}, expose_all=True)
    tee_node: ad.Node=ad.ShapeNode(Pipe, {'h': 'tee_h'}, expose_all=True)
    
    EXAMPLE_SHAPE_ARGS=ad.args(inside_r=6, outside_r=10, fn=64, skew=22.5)
    EXAMPLE_ANCHORS=(
        ad.surface_args('tee', 'top'),
        ad.surface_args('tee', 'surface', 15, 225),
        ad.surface_args('base'),
        ad.surface_args('surface', 50, 0),
        ad.surface_args('inner_surface', 0, 45),
        )
    
    def build(self) -> ad.Maker:
        maker = self.through_node().composite('through').at('base')
        maker.add_at(
                self.tee_node().composite('tee')
                .at('base'),
                'base', self.tee_pos, post=ad.rotX(90 + self.skew))

        return maker


if __name__ == '__main__':
    ad.anchorscad_main(False)